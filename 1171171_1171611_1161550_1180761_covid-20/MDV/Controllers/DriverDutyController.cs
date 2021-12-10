using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.VehicleDuties;
using MDV.Domain.Shared;
using MDV.Domain.DriverDuties;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverDutyController : ControllerBase
    {
        private readonly DriverDutyService _service;

        public DriverDutyController(DriverDutyService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<DriverDutyDTO>> Create(DriverDutyMapper dto)
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
        public async Task<ActionResult<DriverDutyDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new DriverDutyId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

         
        [HttpGet("all")]
        public async Task<ActionResult<List<DriverDutyDTO>>> GetAllDriverDuties()
        {
            var vs = await _service.GetAllDriverDuties();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

       /*  
        [HttpGet("date/{date}")]
        public async Task<ActionResult<List<VehicleDutyDTO>>> getVDutyByDay(DateTime date)
        {
            Console.WriteLine("Aui");
            var vs = await _service.GetByDateAsync(date);

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        } */

    }
}