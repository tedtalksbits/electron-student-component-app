import { ResultSetHeader } from 'mysql2';
import connection from './sql';

const crudRepository = {
  async selectAll(table: string) {
    const [rows] = await connection.execute(`SELECT * FROM ${table}`);
    return rows;
  },

  async select<T extends Record<string, unknown>>(
    table: string,
    fields: string[],
    where: T,
    orderBy?: string,
    limit?: number,
    offset?: number
  ) {
    const keys = Object.keys(where);
    const values = Object.values(where);
    // const [rows] = await connection.execute(
    //   `SELECT ${fields.join(', ')} FROM ${table} WHERE ${keys.join(
    //     ' = ? AND '
    //   )} = ?`,
    //   values
    // );
    // return rows as any[];

    let query = `SELECT ${fields.join(', ')} FROM ${table} WHERE ${keys
      .map((key) => `${key} = ?`)
      .join(' AND ')}`;

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    if (offset) {
      query += ` OFFSET ${offset}`;
    }

    const [rows] = await connection.execute(query, values);

    return rows as any[];
  },

  async deleteOne(table: string, id: number) {
    await connection.execute(`DELETE FROM ${table} WHERE id = ${id}`);
    const rows = await crudRepository.selectAll(table);
    return rows;
  },

  async deleteMany<T extends Record<string, any>>(table: string, where: T) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    await connection.execute(
      `DELETE FROM ${table} WHERE ${keys.join(' = ? AND ')} = ?`,
      values
    );
    const rows = await crudRepository.selectAll(table);
    return rows;
  },

  async insertMany(table: string, data: any[]) {
    // Prepare the SQL query for inserting multiple rows
    const query = `INSERT INTO ${table} (${Object.keys(data[0]).join(
      ', '
    )}) VALUES ?`;

    console.log('insertMany', query, data);

    // Extract values from the data array
    const values = data.map((item) => Object.values(item));

    console.log('insertMany', values);

    // Execute the query with the provided connection
    const [result] = await connection.query(query, [values]);

    return result as ResultSetHeader;
  },

  async updateOne(table: string, id: number, data: any) {
    console.log('updateOne', id, table, data);
    const keys = Object.keys(data);
    const values = Object.values(data);
    await connection.execute(
      `UPDATE ${table} SET ${keys
        .map((key) => `${key} = ?`)
        .join(', ')} WHERE id = ?`,
      [...values, id]
    );

    const [update] = await connection.execute(
      `SELECT * FROM ${table} WHERE id = ${id}`
    );
    return update as any[];
  },

  async updateMany<T extends Record<string, any>>(
    table: string,
    data: T,
    where: T
  ) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    await connection.execute(
      `UPDATE ${table} SET ${keys
        .map((key) => `${key} = ?`)
        .join(', ')} WHERE ${whereKeys.join(' = ? AND ')} = ?`,
      [...values, ...whereValues]
    );

    const rows = await crudRepository.selectAll(table);
    return rows;
  },

  async createOne(table: string, data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const [rows] = await connection.execute(
      `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys
        .map(() => '?')
        .join(', ')})`,
      values
    );

    // get the last inserted id from the rows array
    const { insertId } = rows as any;

    // get the newly created row
    const [newRow] = await connection.execute(
      `SELECT * FROM ${table} WHERE id = ${insertId}`
    );

    return newRow as any[];
  },
  async insertOne(table: string, data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const [rows] = await connection.execute(
      `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys
        .map(() => '?')
        .join(', ')})`,
      values
    );

    // get the last inserted id from the rows array
    const { insertId } = rows as any;

    // get the newly created row
    const [newRow] = await connection.execute(
      `SELECT * FROM ${table} WHERE id = ${insertId}`
    );

    return newRow as any[];
  },
};

export default crudRepository;
