using System;
using MDV.Domain.Shared;
using Microsoft.AspNetCore.Identity;

namespace MDV.Domain.Users
{
    public class User : Entity<UserId>
    {
        public string userName { get; set; }

        public string email { get; set; }
        public string firstName { get; set; }
        public string password { get; set; }
        public string UserType { get; set; }


        public User(string userName,string email, string firstName, string password, string UserType)
        {
            this.Id = new UserId(Guid.NewGuid());
            this.userName = userName;
            this.email = email;
            this.firstName = firstName;
            this.password = password;
            this.UserType = UserType;
        }
    }


}