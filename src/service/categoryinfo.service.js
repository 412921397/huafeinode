const connection = require('../app/database');

class categoryService {
  async create(category) {
    console.log(category, 'categoryinfo数据');
    // 1.获取category的数据
    const { name, newPrice, picture, status, count, brand, createT, nameDesc, weight, categoryType, storeName } = category;

    try {
      // 1. 参数校验
      if (!name || status === undefined) {
        throw new Error('Missing required fields: name, picture, or status');
      }

      // 2. 动态生成 SQL 语句
      const fields = [];
      const placeholders = [];
      const params = [];

      if (name !== undefined) {
        fields.push('name');
        placeholders.push('?');
        params.push(name);
      }
      if (count !== undefined) {
        fields.push('count');
        placeholders.push('?');
        params.push(count);
      }
      if (brand !== undefined) {
        fields.push('brand');
        placeholders.push('?');
        params.push(brand);
      }
      if (newPrice !== undefined) {
        fields.push('newPrice');
        placeholders.push('?');
        params.push(newPrice);
      }
      if (picture !== undefined) {
        fields.push('picture');
        placeholders.push('?');
        params.push(picture);
      }
      if (status !== undefined) {
        fields.push('status');
        placeholders.push('?');
        params.push(status);
      }
      if (nameDesc !== undefined) {
        fields.push('nameDesc');
        placeholders.push('?');
        params.push(nameDesc);
      }
      if (createT !== undefined) {
        fields.push('createT');
        placeholders.push('?');
        params.push(createT);
      }
      if (weight !== undefined) {
        fields.push('weight');
        placeholders.push('?');
        params.push(weight);
      }
      if (categoryType !== undefined) {
        fields.push('categoryType');
        placeholders.push('?');
        params.push(categoryType);
      }
      if (storeName !== undefined) {
        fields.push('storeName');
        placeholders.push('?');
        params.push(storeName);
      }

      // 如果没有有效的字段，抛出错误
      if (fields.length === 0) {
        throw new Error('No valid fields to insert');
      }

      // 3. 拼接 SQL 语句
      const statement = `INSERT INTO \`category_info\` (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;

      // 4. 调试：打印 SQL 语句和参数
      console.log('SQL:', statement);
      console.log('Params:', params);

      // 5. 执行 SQL 语句
      const [result] = await connection.execute(statement, params);

      // 6. 返回插入结果
      return {
        id: result.insertId, // 返回插入的 ID
        ...(name && { name }),
        ...(count && { count }),
        ...(brand && { brand }),
        ...(newPrice && { newPrice }),
        ...(picture && { picture }),
        ...(status !== undefined && { status }),
        ...(nameDesc && { nameDesc }),
        ...(createT && { createT }),
        ...(weight && { weight }),
        ...(categoryType && { categoryType }),
        ...(storeName && { storeName })
      };
    } catch (error) {
      console.error('SQL Error:', error);
      throw new Error('Failed to add category info');
    }
  }

  async list({ name, status, brand, storeName, page = 1, pageSize = 10 }) {
    try {
      // 查询总条数
      let countSql = 'SELECT COUNT(*) AS total FROM category_info';
      const countParams = [];

      // 查询当前页数据
      let sql = 'SELECT * FROM category_info';
      const params = [];

      // 动态拼接 WHERE 子句
      const conditions = [];
      if (name) {
        conditions.push('name LIKE ?');
        params.push(`%${name}%`);
        countParams.push(`%${name}%`);
      }
      if (storeName) {
        conditions.push('storeName LIKE ?');
        params.push(`%${storeName}%`);
        countParams.push(`%${storeName}%`);
      }
      if (status !== undefined) {
        conditions.push('status = ?');
        params.push(status);
        countParams.push(status);
      }
      if (brand) {
        conditions.push('brand LIKE ?');
        params.push(`%${brand}%`);
        countParams.push(`%${brand}%`);
      }

      // 如果有搜索条件，拼接 WHERE 子句
      if (conditions.length > 0) {
        const whereClause = ' WHERE ' + conditions.join(' AND ');
        sql += whereClause;
        countSql += whereClause;
      }

      // 分页逻辑
      const offset = (page - 1) * pageSize;

      // 使用直接插入的方式来设置 LIMIT 和 OFFSET
      sql += ` LIMIT ${Number(pageSize)} OFFSET ${Number(offset)}`;

      // 调试：打印 SQL 语句和参数
      console.log('Count SQL:', countSql);
      console.log('Count Params:', countParams);
      console.log('Data SQL:', sql);
      console.log('Data Params:', params);

      // 执行查询
      const [countResult] = await connection.execute(countSql, countParams);
      const total = countResult[0].total;
      const [rows] = await connection.execute(sql, params);

      // 返回分页信息
      return {
        total,
        page,
        pageSize,
        list: rows
      };
    } catch (error) {
      console.error('SQL Error:', error);
      throw new Error('Failed to fetch category list');
    }
  }

  async update(data) {
    const { id, name, newPrice, oldPrice, picture, status, count, nameDesc, weight, categoryType, storeName, updateT } = data;

    try {
      // 初始化 SQL 语句和参数
      let sql = 'UPDATE `category_info` SET ';
      const params = [];
      const updates = [];

      // 动态添加需要更新的字段
      if (name !== undefined) {
        updates.push('name = ?');
        params.push(name);
      }
      if (newPrice !== undefined) {
        updates.push('newPrice = ?');
        params.push(newPrice);
      }
      if (oldPrice !== undefined) {
        updates.push('oldPrice = ?');
        params.push(oldPrice);
      }
      if (picture !== undefined) {
        updates.push('picture = ?');
        params.push(picture);
      }
      if (status !== undefined) {
        updates.push('status = ?');
        params.push(status);
      }
      if (count !== undefined) {
        updates.push('count = ?');
        params.push(count);
      }
      if (nameDesc !== undefined) {
        updates.push('nameDesc = ?');
        params.push(nameDesc);
      }
      if (weight !== undefined) {
        updates.push('weight = ?');
        params.push(weight);
      }
      if (categoryType !== undefined) {
        updates.push('categoryType = ?');
        params.push(categoryType);
      }
      if (storeName !== undefined) {
        updates.push('storeName = ?');
        params.push(storeName);
      }
      if (updateT !== undefined) {
        updates.push('updateT = ?');
        params.push(updateT);
      }

      // 如果没有需要更新的字段，直接返回
      if (updates.length === 0) {
        throw new Error('No fields to update');
      }

      // 拼接 SQL 语句
      sql += updates.join(', ') + ' WHERE id = ?';
      params.push(id);

      // 调试：打印 SQL 语句和参数
      console.log('SQL:', sql);
      console.log('Params:', params);

      // 执行 SQL 语句
      const [result] = await connection.execute(sql, params);
      return result;
    } catch (error) {
      console.error('SQL Error:', error);
      throw new Error('Failed to update category info');
    }
  }

  async remove(id) {
    const statement = `DELETE FROM category_info WHERE id = ?`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }

  async updateUserAvatar(avatarUrl, id) {
    const statement = `UPDATE category_info SET picture = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, id]);
    return result;
  }
}

module.exports = new categoryService();
