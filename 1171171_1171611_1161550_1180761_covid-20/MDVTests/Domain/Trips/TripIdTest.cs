
using MDV.Domain.Trips;
using Xunit;

namespace MDVTests.Domain.Trips
{

    public class TripIdTest{

               
          public string Id= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void ViaturaIdConstrutorGetsSets()
        {
                     
            var tripId = new TripId(this.Id);

            Assert.NotNull(tripId);  
        }

        [Fact]
        public void AsStringTest(){

            var tripId = new TripId(this.Id);

            string valor; 
            valor = tripId.AsString();
            Assert.Equal(this.Id,valor);

        }
       
    }
}