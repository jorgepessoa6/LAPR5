using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.Generations
{
    public class PopulationId : EntityId
    {
        [JsonConstructor]
        public PopulationId(Guid value) : base(value)
        {
        }

        public PopulationId(String value) : base(value)
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