using System;
using Xunit;
using MDV.Domain.Users;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Trips;

namespace test.Domain.WorkBock
{
    public class UserTest
    {

        /* private Trip viagem = new Trip("Trip:1", true, Direction.Go, "Line:1", true, ); */

        [Fact]
        public void criarUserSuccess()
        {

            User user = new User("User:1", "User:1", "User:1", "Node:1", "Node:2");
            Assert.NotNull(user);
        }

    }
}