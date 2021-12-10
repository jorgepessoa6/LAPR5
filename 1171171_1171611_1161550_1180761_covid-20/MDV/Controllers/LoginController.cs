using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MDV.Domain.Users;
using MDV.Domain.Shared;
using System.Threading.Tasks;

namespace MDV.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;

        private readonly UserService _service;

        public LoginController(IConfiguration config, UserService service)
        {
            _config = config;
            _service = service;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            try
            {
                IActionResult response = Unauthorized();
                Microsoft.AspNetCore.Mvc.ActionResult<User> userAc = await AuthenticateUser(login);
                User user = (User) userAc.Value;
                if (user != null)
                {
                    var tokenString = GenerateJWT(user);
                    response = Ok(new
                    {
                        token = tokenString,
                        userDetails = user,
                    });
                }
                return response;
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        public async Task<ActionResult<User>> AuthenticateUser(Login loginCredentials)
        {

            try
            {
                var lUsers = await _service.GetAllUsers();
                System.Collections.IEnumerable usersAll = lUsers as System.Collections.IEnumerable;
                foreach (var x in usersAll)
                {
                    var user = (UserDTO) x;
                    if (user.userName == loginCredentials.UserName && user.password == loginCredentials.Password)
                    {  
                        return new User(user.userName, user.email, user.firstName, user.password, user.UserType);
                    }
                }
                return NotFound();
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        string GenerateJWT(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.userName),
                new Claim("firstName", userInfo.firstName.ToString()),
                new Claim("role",userInfo.UserType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}