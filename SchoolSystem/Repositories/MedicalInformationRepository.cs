using Microsoft.EntityFrameworkCore;
using SchoolSystem.Contexts;
using SchoolSystem.Entities;
using SchoolSystem.Entities;
using SchoolSystem.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolSystem.Repositories
{
    public class MedicalInformationRepository : IMedicalInformationRepository<MedicalInformation>
    {
        readonly MainContext mainContext;

        public MedicalInformationRepository(MainContext context)
        {
            mainContext = context;
        }

        public async Task<IEnumerable<MedicalInformation>> GetAll()
        {
            return await mainContext.MedicalInformation.ToListAsync();
        }

        public async Task<MedicalInformation> Get(int id)
        {
            return await mainContext.MedicalInformation.FindAsync(id);
        }

        public async Task<MedicalInformation> Add(MedicalInformation obj)
        {
            var result = await mainContext.AddAsync(obj);
            await mainContext.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<MedicalInformation> Update(int id, MedicalInformation obj)
        {
            mainContext.Entry(obj).State = EntityState.Modified;
            //result.Name = obj.Name;
            await mainContext.SaveChangesAsync();

            return null;
        }

        public async Task Delete(int id)
        {
            var result = await mainContext.MedicalInformation.FindAsync(id);

            if(result != null)
            {
                mainContext.MedicalInformation.Remove(result);
                await mainContext.SaveChangesAsync();
            }
        }

    }
}
