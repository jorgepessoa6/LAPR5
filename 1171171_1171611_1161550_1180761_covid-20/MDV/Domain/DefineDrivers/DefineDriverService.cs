using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using MDV.Domain.Shared;

namespace MDV.Domain.DefineDrivers
{
    public class DefineDriverService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDefineDriverRepository _repo;

        //REFERENCIA A WORKBLOCK 
        //private readonly ICategoryRepository _repoCat;

        public DefineDriverService(IUnitOfWork unitOfWork, IDefineDriverRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            //FALTA REPO DE WB
            //this._repoCat = repoCategories;
        }

        public async Task<DefineDriverDTO> AddAsync(DefineDriverMapper dto)
        {   
            //FAZER VERIFICACAO DE WORK BLOCKS
            // await checkCategoryIdAsync(dto.CategoryId);
            var defineDriver = new DefineDriver(dto.NrMecano, dto.Nome, dto.DataNascimento, dto.CC, dto.NIF, dto.TipoTripulante,
                                                dto.DataEntrada, dto.DataSaida, dto.DataCartaConducao, dto.NrCartaConducao);

            await this._repo.AddAsync(defineDriver);

            await this._unitOfWork.CommitAsync();

            return new DefineDriverDTO(defineDriver.Id.AsGuid(),defineDriver.NrMecano,defineDriver.Nome, defineDriver.DataNascimento, defineDriver.CC,
                                    defineDriver.NIF, defineDriver.TipoTripulante, defineDriver.DataEntrada, defineDriver.DataSaida, dto.DataCartaConducao,
                                    defineDriver.NrCartaConducao );
        }
/*         private async Task checkCategoryIdAsync(CategoryId categoryId)
        {
           var category = await _repoCat.GetByIdAsync(categoryId);
           if (category == null)
                throw new BusinessRuleValidationException("Invalid Category Id.");
        } */
           public async Task<DefineDriverDTO> GetByIdAsync(DefineDriverId id)
        {
            var vs = await this._repo.GetByIdAsync(id);
            
            if(vs == null)
                return null;

            return new DefineDriverDTO(vs.Id.AsGuid(),vs.NrMecano,vs.Nome,vs.DataNascimento,vs.CC,vs.NIF,vs.TipoTripulante,vs.DataEntrada,
                                        vs.DataSaida,vs.DataCartaConducao,vs.NrCartaConducao);
        }

    }

    
}