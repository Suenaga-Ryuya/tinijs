+++json
{
  "status": "publish",
  "title": "CLI expansion",
  "category": "content"
}
+++

Expand [Tini CLI](/cli) with more content related commands.

## `content build`

The build content of the [Tini Content](/module/content) module.

```bash
npx tini content build
```

| Option | Description |
| --- | --- |
| `--dir <value>` or `-d` | Custom content dir, default is `content`. |
| `--stagingDir <value>` or `-s` | Custom staging dir for 11ty, default is `.content`. |
| `--outDir <value>` or `-o` | Custom output dir, default is `app/public`. |
| `--clean` or `-c` | Clean staging and out dir before build. |
| `--debug` or `-d` | Show 11ty logs. |
