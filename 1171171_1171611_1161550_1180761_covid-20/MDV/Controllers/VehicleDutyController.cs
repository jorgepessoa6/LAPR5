using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.VehicleDuties;
using MDV.Domain.Shared;



namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleDutyController : ControllerBase
    {
        private readonly VehicleDutyService _service;

        public VehicleDutyController(VehicleDutyService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<VehicleDutyDTO>> Create(VehicleDutyMapper dto)
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
        public async Task<ActionResult<VehicleDutyDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new VehicleDutyId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }
        
        [HttpGet("all")]
        public async Task<ActionResult<List<VehicleDutyDTO>>> getVDutyByDay()
        {
                 var vs = await _service.GetAllAsync();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

    }
}