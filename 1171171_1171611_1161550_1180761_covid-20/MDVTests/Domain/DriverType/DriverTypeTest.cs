using System;
using Xunit;
using MDV.Domain.DriverTypes;
using MDV.Domain.Shared;
using System.Collections.Generic;
using MDV.Domain.Trips;

namespace test.Domain.WorkBock
{
    public class DriverTypeTest
    {

        public string Nome = "Nome";

        [Fact]
        public void criarDriverTypeSuccess()
        {

            DriverType user = new DriverType(this.Nome);
            Assert.NotNull(user);
        }
    }
}