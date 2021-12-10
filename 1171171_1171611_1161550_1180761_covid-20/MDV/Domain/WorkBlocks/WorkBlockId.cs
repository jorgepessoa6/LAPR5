using System;
using MDV.Domain.Shared;
using Newtonsoft.Json;

namespace MDV.Domain.WorkBlocks
{
    public class WorkBlockId : EntityId
    {
        [JsonConstructor]
        public WorkBlockId(Guid value) : base(value)
        {
        }

        public WorkBlockId(String value) : base(value)
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