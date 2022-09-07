using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolSystem.Repositories.Contracts
{
    public interface IBaseRepository<T>
    {
        public Task<IEnumerable<T>> GetAll();
        public Task<T> Get(int id);
        public Task<T> Add(T obj);
        public Task<T> Update(int id, T obj);
        public Task Delete(int id);
    }
}
