
using AutoMapper;

using MM.Entities.Models;
using MM.Entities.DTOs.Merchant;

namespace MM.Services.Mapping
{
    public class MerchantProfile : Profile
    {
        public MerchantProfile()
        {
            CreateMap<Merchant, MerchantReadDto>();
            CreateMap<MerchantCreateDto, Merchant>();
            CreateMap<MerchantUpdateDto, Merchant>();
            CreateMap<Merchant, MerchantUpdateDto>();
        }
    }
}
