/* using Microsoft.EntityFrameworkCore;
using MDV.Domain;
using MDV.Domain.DefineDrivers;

public static class MDVContextMockerDefineDriver
{

    public static MDVContext GetMDVContext()
    {
        var options = new DbContextOptionsBuilder<MDVContext>().UseInMemoryDatabase("DefineDrivers").Options;
        MDVContext dbContext = new MDVContext(options);
        return dbContext;
    }

} */