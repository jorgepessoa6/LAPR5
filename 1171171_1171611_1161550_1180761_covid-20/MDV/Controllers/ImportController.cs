using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.VehicleDuties;
using MDV.Domain.Shared;
using MDV.Domain.DriverDuties;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using MDV.Domain.Import;

namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : ControllerBase
    {
        private readonly ImportService _service;

        public ImportController(ImportService service)
        {
            _service = service;
        }


        [HttpPost]
        public async Task<ActionResult<bool>> Create(IFormFile file)
        {
            string fileTempDir = Path.GetTempFileName();

            if (file.Length > 0)
            {
                using (var stream = new FileStream(fileTempDir, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            try
            {
                await _service.ImportXML(fileTempDir);
                return CreatedAtAction("true", true);


            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
