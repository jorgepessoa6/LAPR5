using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;
using MDV.Domain.Generations;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerationController : ControllerBase
    {
        private readonly GenerationService _service;

        public GenerationController(GenerationService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<List<GenerationDTO>>> Create(GenerationMapper dto)
        {
            try
            {
                var vs = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = vs.Id }, vs);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<GenerationDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new GenerationId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }


        [HttpGet("all")]
        public async Task<ActionResult<List<GenerationDTO>>> GetAllGenerations()
        {
            var vs = await _service.GetAllGenerations();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("allPopulations")]
        public async Task<ActionResult<List<Population>>> GetAllPopulations()
        {
            var vs = await _service.GetPopulations();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

    }
}