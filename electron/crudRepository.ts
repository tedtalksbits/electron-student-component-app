import connection from './sql';

const crudRepository = {
  async selectAll(table: string) {
    const [rows] = await connection.execute(`SELECT * FROM ${table}`);
    return rows;
  },

  async select<T extends Record<string, unknown>>(
    table: string,
    fields: string[],
    where: T
  ) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const [rows] = await connection.execute(
      `SELECT ${fields.join(', ')} FROM ${table} WHERE ${keys.join(
        ' = ? AND '
      )} = ?`,
      values
    );
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
    const keys = Object.keys(data[0]);
    const values = data.map((item) => Object.values(item));
    await connection.execute(
      `INSERT INTO ${table} (${keys.join(', ')}) VALUES ${values
        .map(() => `(${keys.map(() => '?').join(', ')})`)
        .join(', ')}`,
      values.flat()
    );
    const rows = await crudRepository.selectAll(table);
    return rows;
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
