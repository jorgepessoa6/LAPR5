using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Vehicles;
using MDV.Domain.Shared;



namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly VehicleService _service;

        public VehicleController(VehicleService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<VehicleDTO>> Create(VehicleMapper dto)
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
        public async Task<ActionResult<VehicleDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new VehicleId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

    }
}