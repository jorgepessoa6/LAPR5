using MDV.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System;
using Moq;
using MDV.Domain.Users;
using Xunit;

namespace MDVTestes.MDVTests.Domain.UsersTrabalho
{

    public class UserServiceTest
    {


        public Guid Id = Guid.NewGuid();
        public Guid Id2 = Guid.NewGuid();

        public string userName = "key";
        public string email = "email";
        public string firstName = "firstName";
        public string password = "password";
        public string UserType = "UserType";

        public string userName2 = "key";
        public string email2 = "email";
        public string firstName2 = "firstName";
        public string password2 = "password";
        public string UserType2 = "UserType";


        [Fact]
        public void UserServiceConstrutor()
        {

            var mockBlocoRepo = new Mock<IUserRepository>();
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new UserService(mockUnitRepo.Object, mockBlocoRepo.Object);

            Assert.NotNull(service);
        }

        [Fact]
        public async void GetAllAsyncTest()
        {

            var mockRepo = new Mock<IUserRepository>();
            mockRepo.Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(GetUsers());
            var mockUnitRepo = new Mock<IUnitOfWork>();

            var service = new UserService(mockUnitRepo.Object, mockRepo.Object);

            var users = await service.GetAllUsers();

            var usersDTO = GetUsersDTO();

            Assert.Equal(usersDTO.Count(), users.Count());
        }

        [Fact]
        public async void AddAsyncTest()
        {
            var user1 =  new User(
                this.userName,
                this.email,
                this.firstName,
                this.password,
                this.UserType
                );

            var user2 = new UserMapper(this.userName, this.email,this.firstName,
            this.password,this.UserType);

            var mockRepo = new Mock<IUserRepository>();
            mockRepo.Setup(repo => repo.AddAsync(user1));
            var mockUnitRepo = new Mock<IUnitOfWork>();
            mockUnitRepo.Setup(repo => repo.CommitAsync());

            var service = new UserService(mockUnitRepo.Object, mockRepo.Object);

            var user = await service.AddAsync(user2);

            Assert.Equal(user.email, user2.email);

        }

        private List<User> GetUsers()
        {
            var users = new List<User>();
            users.Add(new User(
                this.userName,
                this.email,
                this.firstName,
                this.password,
                this.UserType
                ));

            users.Add(new User(
                this.userName2,
                this.email2,
                this.firstName2,
                this.password2,
                this.UserType2
                ));

            return users;
        }

        private List<UserDTO> GetUsersDTO()
        {
            List<UserDTO> users = new List<UserDTO>();
            users.Add(new UserDTO(this.Id,this.userName, this.email,this.firstName,
            this.password,this.UserType));
            users.Add(new UserDTO(this.Id2,this.userName2, this.email2,this.firstName2,
            this.password2,this.UserType2));
            return users;
        }
    }
}