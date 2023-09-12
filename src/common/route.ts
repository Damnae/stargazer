import { RouteLocation, RouteLocationRaw } from "vue-router";
import { getLatestCommitId } from "./datasource";

interface KeyAny { [name: string]:any }
export function toRouteProps(mapping:KeyAny) 
{
    return function(route:RouteLocation) 
    {
        const props:KeyAny = {};
        for (var key in route.params) 
        {
            const type:any = mapping[key];
            if (type === false)
                continue

            const param = route.params[key];
            if (param == null || type == null)
                props[key] = param;
            else if (typeof(type) == 'function') 
                props[key] = type(param);
            else if (type == 'number' && typeof(param) == 'string')
                props[key] = Number.parseInt(param, 10);
            else if (type == 'boolean') 
                props[key] = (param as any) == true;
            else props[key] = param;
        }
        return props;
    }
}

const latestCommitId = await getLatestCommitId()
export function redirectToLatestCommit(to:RouteLocation) : RouteLocationRaw
{
    const routeName = to.meta.redirectName as string
    const routeParams:KeyAny = { commitId:latestCommitId, }

    for (const [p, i] of Object.entries(to.params))
        routeParams[p] = i

    return { name: routeName, params: routeParams, }
}