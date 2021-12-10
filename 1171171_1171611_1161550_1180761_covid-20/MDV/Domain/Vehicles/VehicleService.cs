using System;
using System.Threading.Tasks;
using MDV.Domain.Shared;

namespace MDV.Domain.Vehicles
{
    public class VehicleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleRepository _repo;

        //REFERENCIA A WORKBLOCK 
        //private readonly ICategoryRepository _repoCat;

        public VehicleService(IUnitOfWork unitOfWork, IVehicleRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<VehicleDTO> AddAsync(VehicleMapper dto)
        {   
            //FAZER VERIFICACAO DE WORK BLOCKS
            // await checkCategoryIdAsync(dto.CategoryId);
            var vehicle = new Vehicle(dto.Matricula, dto.VIN, dto.Tipo, dto.DataEntrada);

            await this._repo.AddAsync(vehicle);

            await this._unitOfWork.CommitAsync();

            return new VehicleDTO(vehicle.Id.AsGuid(),vehicle.Matricula, vehicle.VIN, vehicle.Tipo, vehicle.DataEntrada );
        }
/*         private async Task checkCategoryIdAsync(CategoryId categoryId)
        {
           var category = await _repoCat.GetByIdAsync(categoryId);
           if (category == null)
                throw new BusinessRuleValidationException("Invalid Category Id.");
        } */
           public async Task<VehicleDTO> GetByIdAsync(VehicleId id)
        {
            var vs = await this._repo.GetByIdAsync(id);
            
            if(vs == null)
                return null;

            return new VehicleDTO(vs.Id.AsGuid(),vs.Matricula,vs.VIN,vs.Tipo,vs.DataEntrada);
        }

    }

    
}