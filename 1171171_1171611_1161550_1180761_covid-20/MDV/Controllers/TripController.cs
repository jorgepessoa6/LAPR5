using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using MDV.Domain.Trips;
using MDV.Domain.Shared;
using System.Collections.Generic;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly TripService _service;

        public TripController(TripService service)
        {
            _service = service;
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<TripDTO>> Create(TripMapper[] dto)
        {
            try
            {
                  var vs = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = vs[0].Id }, vs);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        // POST: api/Products
        [HttpPost("AdHoc")]
        public async Task<ActionResult<TripDTO>> CreateAhHoc(TripMapper dto)
        {
            try
            {
                var vs = await _service.AddHocAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = vs.Id }, vs);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<TripDTO>> GetGetById(Guid id)
        {
            var vs = await _service.GetByIdAsync(new TripId(id));

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<TripDTO>>> GetAllTrips()
        {
            var vs = await _service.GetAllTrips();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("all/{line}")]
        public async Task<ActionResult<List<TripDTO>>> GetAllOfLine(string line)
        {
            var vs = await _service.GetAllOfLineAsync(line);

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("tripsWithoutWorkBlock")]
         public async Task<ActionResult<List<TripDTO>>> getTripsWithoutWorkBlock()
        {
            var vs = await _service.getTripsWithoutWorkBlock();

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }

        [HttpGet("getPassingTimes/{trip}")]
         public async Task<ActionResult<List<PassingTime>>> getPassingTimes(string trip)
        {
            var vs = await _service.getPassigTimes(trip);

            if (vs == null)
            {
                return NotFound();
            }

            return vs;
        }



    }
}