type ReleaseFunc = () => void

export class MutexGroup
{
    private mutexes:{[key:string]:Mutex} = {}

    public async runExclusive<T>(key:string, action:() => Promise<T>) : Promise<T>
    {
        let mutex = this.mutexes[key]
        if (!mutex)
            this.mutexes[key] = mutex = new Mutex()
        
        return mutex.runExclusive(action)
    }
}

export class Mutex 
{
    private locked = false
    private queue:{resolve:(release:ReleaseFunc) => void}[] = []

    public acquire() : Promise<ReleaseFunc>
    {
        return new Promise<ReleaseFunc>((resolve) => 
        {
            this.queue.push({resolve})
            this.dispatch()
        })
    }

    public async runExclusive<T>(action:() => Promise<T>) : Promise<T>
    {
        const release = await this.acquire()
        try 
        {
            return await action()
        } 
        finally 
        {
            release()
        }
    }

    private dispatch() : void
    {
        if (this.locked)
            return

        const next = this.queue.shift()
        if (!next) 
            return

        this.locked = true
        next.resolve(this.createReleaseFunc())
    }

    private createReleaseFunc() : ReleaseFunc 
    {
        return () => 
        {
            this.locked = false
            this.dispatch()
        }
    }
}