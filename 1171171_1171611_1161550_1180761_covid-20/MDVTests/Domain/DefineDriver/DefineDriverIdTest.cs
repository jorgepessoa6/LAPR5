using System;
using MDV.Domain.DefineDrivers;
using Xunit;

namespace MDVTests.Domain.DefineDrivers{

    public class DefineDriverIdTest{

               
          public string Id= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void DefineDriverIdConstrutorGetsSets()
        {
                     
            var defineDriverId = new DefineDriverId(this.Id);

            Assert.NotNull(defineDriverId);  
        }

        [Fact]
        public void AsStringTest(){

            var defineDriverId = new DefineDriverId(this.Id);

            string valor; 
            valor = defineDriverId.AsString();
            Assert.Equal(this.Id,valor);

        }
       
    }
}