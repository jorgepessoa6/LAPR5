using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;
using MDV.Infrastructure.WorkBlocks;
using System;
using MDV.Domain.WorkBlocks;
using MDV.Infrastructure.VehicleDuties;

namespace MDV.Domain.VehicleDuties
{
    public class VehicleDutyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleDutyRepository _repo;

        private readonly IWorkBlockRepository _repoWB;

        //REFERENCIA A WORKBLOCK 
        //private readonly ICategoryRepository _repoCat;

        public VehicleDutyService(IUnitOfWork unitOfWork, IVehicleDutyRepository repo, IWorkBlockRepository r)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoWB = r;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<VehicleDutyDTO> AddAsync(VehicleDutyMapper dto)
        {
            //FAZER VERIFICACAO DE WORK BLOCKS
            // await checkCategoryIdAsync(dto.CategoryId);
            List<WorkBlock> dutyWB = new List<WorkBlock>();
            foreach (var wb in dto.WorkBlocks)
            {

                if (wb != null)
                {

                    Console.Write(wb);
                    WorkBlock troll = new WorkBlock(wb);
                    WorkBlock l = this._repoWB.GetByIdAsync(troll.Id).Result;
                    dutyWB.Add(l);

                }
            }
            var vehicleDuty = new VehicleDuty(dto.Code, dutyWB, dto.RGB);

            Console.WriteLine(vehicleDuty.ToString());

            await this._repo.AddAsync(vehicleDuty);


            await this._unitOfWork.CommitAsync();

            return new VehicleDutyDTO(vehicleDuty.Id.AsGuid(), vehicleDuty.Code, vehicleDuty.WorkBlock, vehicleDuty.RGB);
        }
        /*         private async Task checkCategoryIdAsync(CategoryId categoryId)
                {
                   var category = await _repoCat.GetByIdAsync(categoryId);
                   if (category == null)
                        throw new BusinessRuleValidationException("Invalid Category Id.");
                } */
        public async Task<VehicleDutyDTO> GetByIdAsync(VehicleDutyId id)
        {
            var vs = await this._repo.GetByIdAsync(id);

            if (vs == null)
                return null;

            return new VehicleDutyDTO(vs.Id.AsGuid(), vs.Code, vs.WorkBlock, vs.RGB);
        }
        public async Task<List<VehicleDutyDTO>> GetAllAsync()
        {
            var vs = await this._repo.GetAllVDAsync();

            if (vs == null)
                return null;


            var listDTOs = new List<VehicleDutyDTO>();
            foreach (var item in vs)
            {
                var dto = new VehicleDutyDTO(item.Id.AsGuid(), item.Code, item.WorkBlock, item.RGB);
                listDTOs.Add(dto);
            }
            return listDTOs;


        }

    }


}