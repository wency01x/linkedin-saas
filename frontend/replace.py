import os

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Logo area replacement
old_logo = """        <div className="flex items-center gap-3 group cursor-pointer mr-8">
          <div className="flex text-[#141414] bg-[#B55933] w-9 h-9 rounded-lg relative items-center justify-center shadow-lg">
            <Icon icon="solar:pen-new-square-linear" className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="uppercase leading-none text-2xl font-medium tracking-tight font-oswald">
              NARRAT<span className="text-[#B55933]">.AI</span>
            </span>
            <span className="text-[0.6rem] uppercase text-white/80 tracking-widest font-space">
              Content SaaS
            </span>
          </div>
        </div>"""

new_logo = """        <div className="flex items-center gap-3 group cursor-pointer mr-8">
          <div className="flex flex-col">
            <span className="uppercase leading-none text-2xl font-medium tracking-tight font-oswald text-white">
              NARRAT.AI
            </span>
            <span className="text-[0.6rem] uppercase text-neutral-400 tracking-widest font-space mt-1">
              Content SaaS
            </span>
          </div>
        </div>"""

content = content.replace(old_logo, new_logo)

# Color replacements
replacements = {
    "hover:text-[#B55933]": "hover:text-white",
    "hover:bg-[#A1887D]": "hover:bg-neutral-200",
    "bg-[#B55933]": "bg-white",
    "text-[#141414]": "text-black",
    "text-[#B55933]": "text-white",
    "from-[#B55933]": "from-white",
    "to-[#A1887D]": "to-neutral-500",
    "bg-[#3F3835]": "bg-neutral-900",
    "bg-[#282828]": "bg-neutral-900",
    "border-[#4E4E4E]": "border-neutral-800",
    "hover:border-[#A1887D]": "hover:border-neutral-500",
    "border-[#A1887D]": "border-neutral-500",
    "bg-[#4E4E4E]": "bg-neutral-800",
    "bg-[#A1887D]": "bg-neutral-500",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
