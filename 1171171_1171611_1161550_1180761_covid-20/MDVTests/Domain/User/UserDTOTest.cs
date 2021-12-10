using System;
using MDV.Domain.Users;
using Xunit;

namespace MDVTestes.Domain.User
{

    public class UserDtoTest
    {

        public Guid Id = Guid.NewGuid();
        public string userName = "key";
        public string email = "email";
        public string firstName = "firstName";
        public string password = "password";
        public string UserType = "UserType";

        [Fact]
        public void UserDtoConstructor()
        {
            var userDTO = new UserDTO(this.Id, this.userName,this.email,
            this.firstName, this.password,this.UserType);
            Assert.NotNull(userDTO);
            Assert.Equal(userDTO.Id, this.Id);
            Assert.Equal(userDTO.userName, this.userName);
            Assert.Equal(userDTO.email, this.email);
            Assert.Equal(userDTO.firstName, this.firstName);
            Assert.Equal(userDTO.password, this.password);
            Assert.Equal(userDTO.UserType, this.UserType);

        }
    }
}
