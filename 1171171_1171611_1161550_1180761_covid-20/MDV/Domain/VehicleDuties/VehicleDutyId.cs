using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.VehicleDuties
{
    public class VehicleDutyId : EntityId
    {
        [JsonConstructor]
        public VehicleDutyId(Guid value) : base(value)
        {
        }

        public VehicleDutyId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }
        
        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}