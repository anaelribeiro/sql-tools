const { ise } = require(process.env.ise);

ise.extension.update({
  showIcon: true,
  value: ""
});

ise.window.onShow((show) => {
  if (show) ise.extension.sendEventToWindow('ready', {});
});
