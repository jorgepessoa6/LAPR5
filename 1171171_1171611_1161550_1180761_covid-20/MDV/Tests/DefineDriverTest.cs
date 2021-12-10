/* using System;
using Xunit;
using MDV.Domain.DefineDrivers.DefineDriver;
using MDV.Domain.DefineDrivers.DefineDriverDTO;
using MDV.Controllers.DefineDriverController;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using MDV.Domain.DefineDrivers;
using MDV.Controllers;

namespace Tests
{
    public class DefineDriverTest
    {
        [Fact]
        public void TestPost()
        {
            MDVContext context = MDVContextMockerDefineDriver.GetMDVContext();

            DefineDriverController controller = new DefineDriveController(context);

            DefineDriverDTO dto = new DefineDriverDTO(3,"nome", new DateTime(1998,4,4), 1234, 4321, "tipo",
            new DateTime(2000,2,3), new DateTime(2004,5,6),new DateTime(2010,10,10), 439285);

            int i = (int)context.DefineDrivers.LongCount();
            Assert.Equal(0, i);

            ActionResult result = controller.AddDefineDrive(dto);
            Assert.NotNull(result);

            IQueryable<DefineDriver> defineDrivers = context.DefineDrivers;
            int j = defineDrivers.Count();
            Assert.Equal(1, j);

            DefineDriver dd = defineDrivers.Single();
            Assert.Equal(3, dd.nrMecano.nrMecano);
            Assert.Equal("teste", dd.nome.nome);
            Assert.Equal(new DateTime(1999,9,9)), dd.dataNascimento.dataNascimento);
            Assert.Equal(5, dd.CC.CC);
            Assert.Equal(6, dd.NIF.NIF);
            Assert.Equal("teste", dd.tipoTripulante.tipoTripulante);
            Assert.Equal(new DateTime(1999,9,9)), dd.dataEntrada.dataEntrada);
            Assert.Equal(new DateTime(1999,9,9)), dd.dataSaida.dataSaida);
            Assert.Equal(new DateTime(1999,9,9)), dd.dataCartaConducao.dataCartaConducao);
            Assert.Equal(2, dd.nrCartaConducao.nrCartaConducao);
        }

    }
}
 */