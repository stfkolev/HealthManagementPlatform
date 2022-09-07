using Microsoft.AspNetCore.Mvc;
using SchoolSystem.Models;
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
    public class GendersController : ControllerBase
    {
        private readonly IGenderRepository<Gender> _genderRepository;

        public GendersController(IGenderRepository<Gender> genderRepository)
        {
            _genderRepository = genderRepository;
        }

        // GET: api/<GenderController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gender>>> Get()
        {
            var genders = await _genderRepository.GetAll();

            return Ok(genders);
        }

        // GET api/<GenderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gender>> Get(int id)
        {
            var gender = await _genderRepository.Get(id);

            if(gender == null)
            {
                return NotFound();
            }

            return gender;
        }

        // POST api/<GenderController>
        [HttpPost]
        public async Task<ActionResult<Gender>> Post(Gender gender)
        {
            return await _genderRepository.Add(gender);
        }

        // PUT api/<GenderController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Gender>> Put(int id, Gender gender)
        {
            if(id != gender.Id)
            {
                return BadRequest();
            }

            return await _genderRepository.Update(id, gender);
        }

        // DELETE api/<GenderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _genderRepository.Delete(id);
        }
    }
}
