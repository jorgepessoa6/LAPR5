using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MDV.Domain.Users;
using MDV.Domain.Shared;



namespace MDV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserService _service;

        public RegisterController(UserService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> Create(UserMapper dto)
        {
            var userV = await _service.GetUserByUsername(dto.userName);
            if (userV == null)
            {
                try
                {
                    var vs = await _service.AddAsync(dto);

                    await _service.GetAllUsers();

                    return CreatedAtAction(nameof(GetGetById), new { id = vs.Id }, vs);
                }
                catch (BusinessRuleValidationException ex)
                {
                    return BadRequest(new { Message = ex.Message });
                }
            }
             return BadRequest();
        }


    [HttpGet("{id}")]
    public async Task<ActionResult<UserDTO>> GetGetById(Guid id)
    {
        var vs = await _service.GetByIdAsync(new UserId(id));

        if (vs == null)
        {
            return NotFound();
        }

        return vs;
    }

    [HttpDelete("deleteUser/{username}")]
    public async Task<ActionResult<UserDTO>> DeleteUser(string username)
    {
        try
        {
            return await _service.DeleteUser(username);
        }
        catch (BusinessRuleValidationException ex)
        {
            return BadRequest(new { Message = ex.Message });
        }
    }

}
}