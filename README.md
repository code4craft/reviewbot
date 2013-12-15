reviewbot
=========
>gitlab防呆小工具，自动帮你修正2B代码。

## 使用：

配置`config.json`，例如:

```json
{
    "path": "/data/reviewbot",
    "port": 8888,
    "bot": {
        "branch": ["alpha", "master"],
        "file": "freemarker.properties",
        "encoding": "utf-8",
        "fragment": [
            {
                "search": "template_update_delay=0",
                "replace": "template_update_delay=600000",
                "message": "freemarker缓存时间为0不能提交哦！"
            }
        ],
        "commit": ["${author}同学，下次注意不要提交测试文件",
            "手抖了是不对的，${author}叫你修bug啦",
            "${author}同学，这有个bug，我帮你修掉了"
        ]
    }
}
```