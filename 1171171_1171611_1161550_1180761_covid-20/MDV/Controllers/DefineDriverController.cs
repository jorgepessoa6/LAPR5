using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.DefineDrivers;
using MDV.Domain.Shared;
using MDV.Domain.DriverTypes;



namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefineDriverController : ControllerBase
    {
        private readonly DefineDriverService _service;

        public DefineDriverController(DefineDriverService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<DefineDriverDTO>> Create(DefineDriverMapper dto)
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
        public async Task<ActionResult<DefineDriverDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new DefineDriverId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

    }
}