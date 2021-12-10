using System;
using MDV.Domain.Vehicles;
using Xunit;

namespace MDVTests.Domain.Vehicles{

    public class VehicleIdTest{

               
          public string Id= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void ViaturaIdConstrutorGetsSets()
        {
                     
            var vehicleId = new VehicleId(this.Id);

            Assert.NotNull(vehicleId);  
        }

        [Fact]
        public void AsStringTest(){

            var vehicleId = new VehicleId(this.Id);

            string valor; 
            valor = vehicleId.AsString();
            Assert.Equal(this.Id,valor);

        }
       
    }
}