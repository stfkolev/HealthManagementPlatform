using Microsoft.EntityFrameworkCore;
using SchoolSystem.Contexts;
using SchoolSystem.Models;
using SchoolSystem.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolSystem.Repositories
{
    public class GenderRepository : IGenderRepository<Gender>
    {
        readonly MainContext mainContext;

        public GenderRepository(MainContext context)
        {
            mainContext = context;
        }

        public async Task<IEnumerable<Gender>> GetAll()
        {
            return await mainContext.Genders.ToListAsync();
        }

        public async Task<Gender> Get(int id)
        {
            return await mainContext.Genders.FindAsync(id);
        }

        public async Task<Gender> Add(Gender obj)
        {
            var result = await mainContext.AddAsync(obj);
            await mainContext.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Gender> Update(int id, Gender obj)
        {
            mainContext.Entry(obj).State = EntityState.Modified;
            //result.Name = obj.Name;
            await mainContext.SaveChangesAsync();

            return null;
        }

        public async Task Delete(int id)
        {
            var result = await mainContext.Genders.FindAsync(id);

            if(result != null)
            {
                mainContext.Genders.Remove(result);
                await mainContext.SaveChangesAsync();
            }
        }

    }
}
