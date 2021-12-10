using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MDV.Domain.Users;

namespace MDV.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("GetUserData")]
        [Authorize(Policy = Policies.User)]
        public IActionResult GetUserData()
        {
            return Ok("This is an normal user");
        }

        [HttpGet]
        [Route("GetAdminData")]
        [Authorize(Policy = Policies.Admin)]
        public IActionResult GetAdminData()
        {
            return Ok("This is an Admin user");
        }
    }
}