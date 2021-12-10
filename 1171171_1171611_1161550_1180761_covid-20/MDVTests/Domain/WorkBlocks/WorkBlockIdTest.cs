using System;
using MDV.Domain.WorkBlocks;
using Xunit;

namespace MDVTestes.Domain.WorkBlocks{

    public class WorkBlockIdTest{

               
        public string IdValue= "99999999-9999-9999-9999-999999999999";

        [Fact]
        public void WorkBlockIdConstrutorGetsSets()
        {
                     
            var Id = new WorkBlockId(this.IdValue);

            Assert.NotNull(Id);  
        }

        [Fact]
        public void AsStringTest(){

            var id = new WorkBlockId(this.IdValue);

            string compare = id.AsString();
            Assert.Equal(this.IdValue,compare);

        }
       
    }
}