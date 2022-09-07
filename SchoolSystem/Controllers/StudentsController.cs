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
    public class StudentsController : ControllerBase
    {
        private readonly IStudentRepository<Student> _studentRepository;

        public StudentsController(IStudentRepository<Student> studentRepository)
        {
            _studentRepository = studentRepository;
        }

        // GET: api/<StudentController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> Get()
        {
            var students = await _studentRepository.GetAll();

            return Ok(students);
        }

        // GET api/<StudentController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> Get(int id)
        {
            var student = await _studentRepository.Get(id);

            if(student == null)
            {
                return NotFound();
            }

            return student;
        }

        // POST api/<StudentController>
        [HttpPost]
        public async Task<ActionResult<Student>> Post(Student student)
        {
            return await _studentRepository.Add(student);
        }

        // PUT api/<StudentController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Student>> Put(int id, Student student)
        {
            if(id != student.Id)
            {
                return BadRequest();
            }

            return await _studentRepository.Update(id, student);
        }

        // DELETE api/<StudentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _studentRepository.Delete(id);
        }
    }
}
