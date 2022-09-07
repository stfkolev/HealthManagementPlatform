using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Entities;
using SchoolSystem.Repositories.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SchoolSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalInformationController : ControllerBase
    {
        private readonly IMedicalInformationRepository<MedicalInformation> _genderRepository;

        public MedicalInformationController(IMedicalInformationRepository<MedicalInformation> genderRepository)
        {
            _genderRepository = genderRepository;
        }

        // GET: api/<MedicalInformationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalInformation>>> Get()
        {
            var genders = await _genderRepository.GetAll();

            return Ok(genders);
        }

        // GET api/<MedicalInformationController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalInformation>> Get(int id)
        {
            var gender = await _genderRepository.Get(id);

            if(gender == null)
            {
                return NotFound();
            }

            return gender;
        }

        // POST api/<MedicalInformationController>
        [HttpPost]
        public async Task<ActionResult<MedicalInformation>> Post(MedicalInformation gender)
        {
            return await _genderRepository.Add(gender);
        }

        // PUT api/<MedicalInformationController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<MedicalInformation>> Put(int id, MedicalInformation gender)
        {
            if(id != gender.Id)
            {
                return BadRequest();
            }

            return await _genderRepository.Update(id, gender);
        }

        // DELETE api/<MedicalInformationController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _genderRepository.Delete(id);
        }
    }
}
