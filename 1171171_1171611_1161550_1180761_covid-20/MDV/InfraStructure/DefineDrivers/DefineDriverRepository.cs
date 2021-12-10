using MDV.Domain.DefineDrivers;
using MDV.Infrastructure.Shared;
using MDV.Domain.Shared;


namespace MDV.Infrastructure.DefineDrivers
{
    public class DefineDriverRepository : BaseRepository<DefineDriver, DefineDriverId>,IDefineDriverRepository
    {
        public DefineDriverRepository(MDVDbContext context):base(context.DefineDrivers)
        {
           
        }
    }
}