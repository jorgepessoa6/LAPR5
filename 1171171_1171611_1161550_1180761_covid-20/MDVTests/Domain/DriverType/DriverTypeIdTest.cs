using System;
using MDV.Domain.DriverTypes;
using Xunit;

namespace MDVTests.Domain.DriverTypes{

    public class DriverTypeIdTest{

               
          public string Id= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void DriverTypeIdConstrutorGetsSets()
        {
                     
            var driverTypeId = new DriverTypeId(this.Id);

            Assert.NotNull(driverTypeId);  
        }

        [Fact]
        public void AsStringTest(){

            var driverTypeId = new DriverTypeId(this.Id);

            string valor; 
            valor = driverTypeId.AsString();
            Assert.Equal(this.Id,valor);

        }
       
    }
}