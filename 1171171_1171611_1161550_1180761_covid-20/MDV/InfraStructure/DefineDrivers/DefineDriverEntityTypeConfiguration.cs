using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.DefineDrivers;

namespace MDV.Infrastructure.DefineDrivers
{
    internal class DefineDriverEntityTypeConfiguration : IEntityTypeConfiguration<DefineDriver>
    {
        public void Configure(EntityTypeBuilder<DefineDriver> builder)
        {
            //builder.ToTable("Products", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}