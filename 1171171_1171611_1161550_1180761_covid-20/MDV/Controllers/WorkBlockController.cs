using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.WorkBlocks;
using MDV.Domain.Shared;



namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkBlockController : ControllerBase
    {
        private readonly WorkBlockService _service;

        public WorkBlockController(WorkBlockService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<List<WorkBlockDTO>>> Create(WorkBlockMapper[] dto)
        {
            try
            {
                var vs = await _service.AddAsync(dto);
                
                return CreatedAtAction(nameof(GetGetById),vs[0].Id,vs[0]);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<WorkBlockDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new WorkBlockId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }
        [HttpGet("contiguousOfVehicleService/{time}&{id}")]
        public async Task<ActionResult<List<WorkBlockDTO>>> GetContiguousOfVehicleService(int time,string id)
        {
            var vs = await _service.GetContiguousOfVehicleService(time,id);

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }
          [HttpGet("contiguous/{id}")]
        public async Task<ActionResult<List<WorkBlockDTO>>> GetContiguousWorkBlock(int id)
        {
            var vs = await _service.GetContiguousWorkBlock(id);

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<WorkBlockDTO>>> GetAllWorkBlocks()
        {
            var vs = await _service.GetAllWorkBlocks();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

    }
}