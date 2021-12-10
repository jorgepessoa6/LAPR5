using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MDV.Domain.WorkBlocks;

namespace MDV.Infrastructure.WorkBlocks
{
    internal class WorkBlockEntityTypeConfiguration : IEntityTypeConfiguration<WorkBlock>
    {
        public void Configure(EntityTypeBuilder<WorkBlock> builder)
        {
            //builder.ToTable("Products", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}