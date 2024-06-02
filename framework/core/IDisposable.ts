export interface IDisposable {
    readonly disposed: boolean;
    dispose(): Promise<void> | void;
}

export function using(...disposable: IDisposable[]) {
    return function <T>(
        action: (...disposable: IDisposable[]) => Promise<T> | T
    ) {
        const dispose = async () => {
            for (const d of disposable) {
                await d.dispose();
            }
        };

        let isPromiseResolution = false;
        try {
            const actionExecute = action(...disposable);
            isPromiseResolution = actionExecute instanceof Promise;
            if (isPromiseResolution) {
                return new Promise<T>((resolve, reject) => {
                    (actionExecute as Promise<T>)
                        .then((resolved) => resolve(resolved))
                        .catch((e) => reject(e))
                        .finally(dispose);
                });
            }
            return actionExecute;
        } finally {
            if (!isPromiseResolution) {
                dispose();
            }
        }
    };
}
