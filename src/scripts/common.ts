export interface Grouped<TElement>
{
    [groupBy: string]: TElement[]
}

export interface Grouped2<TElement>
{
    [groupBy: string]: {[groupBy: string]: TElement[]}
}

interface KeyAny { [name: string]:any }
export function toRouteProps(mapping:KeyAny) 
{
    return function(route:any) 
    {
        const props:KeyAny = {};
        for (var key in route.params) 
        {
            const param = route.params[key];
            const type:any = mapping[key];

            if (param == null || type == null)
                props[key] = param;
            else if (typeof(type) == 'function') 
                props[key] = type(param);
            else if (type == 'number')
                props[key] = Number.parseInt(param, 10);
            else if (type == 'boolean') 
                props[key] = param == true;
            else props[key] = param;
        }
        return props;
    }
}

export function delay(ms: number) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}