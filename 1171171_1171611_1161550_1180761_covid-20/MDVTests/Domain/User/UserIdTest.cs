using System;
using MDV.Domain.Users;
using Xunit;

namespace MDVTestes.Domain.User{

    public class UserIdTest{

               
        public string IdValue= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void UserIdConstrutorGetsSets()
        {
                     
            var Id = new UserId(this.IdValue);

            Assert.NotNull(Id);  
        }

        [Fact]
        public void AsStringTest(){

            var id = new UserId(this.IdValue);

            string compare = id.AsString();
            Assert.Equal(this.IdValue,compare);

        }
       
    }
}