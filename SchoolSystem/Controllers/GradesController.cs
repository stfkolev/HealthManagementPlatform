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
    public class GradesController : ControllerBase
    {
        private readonly IGradeRepository<Grade> _gradeRepository;

        public GradesController(IGradeRepository<Grade> gradeRepository)
        {
            _gradeRepository = gradeRepository;
        }

        // GET: api/<GradeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> Get()
        {
            var grades = await _gradeRepository.GetAll();

            return Ok(grades);
        }

        // GET api/<GradeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> Get(int id)
        {
            var grade = await _gradeRepository.Get(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }

        // POST api/<GradeController>
        [HttpPost]
        public async Task<ActionResult<Grade>> Post(Grade grade)
        {
            return await _gradeRepository.Add(grade);
        }

        // PUT api/<GradeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Grade>> Put(int id, Grade grade)
        {
            if (id != grade.Id)
            {
                return BadRequest();
            }

            return await _gradeRepository.Update(id, grade);
        }

        // DELETE api/<GradeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _gradeRepository.Delete(id);
        }
    }
}
