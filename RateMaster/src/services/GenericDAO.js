import apiRequest from '../api/apiService';

class GenericDAO {
  constructor(resourcePath) {
    if (!resourcePath) {
      throw new Error('Caminho do recurso não definido');
    }
    this.resourcePath = resourcePath;
  }

  async getAll() {
    return await apiRequest('get', `/${this.resourcePath}`);
  }

  async getById(id) {
    return await apiRequest('get', `/${this.resourcePath}/${id}`);
  }

  async create(data) {
    return await apiRequest('post', `/${this.resourcePath}`, data);
  }

  async update(id, data) {
    return await apiRequest('put', `/${this.resourcePath}/${id}`, data);
  }

  async delete(id) {
    return await apiRequest('delete', `/${this.resourcePath}/${id}`);
  }
}

export default GenericDAO;
